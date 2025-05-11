import sequelize from "../db.js";

export default async function AuctionController(app) {
  app.get("/auctions", async (req, res) => {
  try {
    const auctions = await sequelize.query(
      "SELECT * FROM lelangs WHERE id_pemenang IS NULL AND tenggat_waktu > NOW()", // Include active auctions check
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).send({
      message: "Success",
      data: auctions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
 

  app.get("/auctions-full", async (req, res) => {
    try {
      const auctions = await sequelize.query("SELECT * FROM lelangs", {
        type: sequelize.QueryTypes.SELECT,
      });

      return res.status(200).send({
        message: "Success",
        data: auctions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.post(
  "/auctions",
  { preValidation: [app.authenticate] },
  async (req, res) => {
    try {
      const { id_user } = req.user;
      const { id_barang, tenggatWaktu } = req.body;

      if (!id_barang) {
        return res.status(400).send({
          message: "Bad Request",
          error: "Item ID is required",
        });
      }

      let tenggat_waktu;
      if (tenggatWaktu) {
        const parsedDate = Date.parse(tenggatWaktu);
        if (isNaN(parsedDate)) {
          return res.status(400).send({
            message: "Bad Request",
            error: "Invalid tenggat_waktu format",
          });
        }
        tenggat_waktu = new Date(parsedDate);
      } else {

        tenggat_waktu = new Date(Date.now() + 60 * 60 * 1000);
      }

      const item = await sequelize.query(
        "SELECT * FROM barangs WHERE id_barang = :id_barang",
        {
          replacements: { id_barang },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (item.length === 0) {
        return res.status(404).send({
          message: "Item not found",
        });
      }

      const [result] = await sequelize.query(
        `INSERT INTO lelangs (id_barang, tgl_lelang, harga_akhir, tenggat_waktu)
         VALUES (:id_barang, NOW(), :harga_awal, :tenggat_waktu)`,
        {
          replacements: {
            id_barang,
            harga_awal: item[0].harga_awal,
            tenggat_waktu,
          },
          type: sequelize.QueryTypes.INSERT,
        }
      );

      return res.status(201).send({
        message: "Auction created successfully",
        data: {
          id_lelang: result,
          id_barang,
          tenggat_waktu,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);


  app.get("/auctions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const auction = await sequelize.query(
        "SELECT * FROM lelangs WHERE id_lelang = :id",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (auction.length === 0) {
        return res.status(404).send({
          message: "Auction not found",
        });
      }

      const auctionData = auction[0]; // Get the first auction item (since it's an array)

      if (
        new Date(auctionData.tenggat_waktu) <= new Date() &&
        !auctionData.id_pemenang
      ) {
        const highestBid = await sequelize.query(
          `SELECT id_user FROM history_lelang 
     WHERE id_lelang = :id 
     ORDER BY harga_penawaran DESC LIMIT 1`,
          {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        if (highestBid.length > 0) {
          await sequelize.query(
            `UPDATE lelangs SET id_pemenang = :id_user WHERE id_lelang = :id`,
            {
              replacements: {
                id_user: highestBid[0].id_user,
                id,
              },
              type: sequelize.QueryTypes.UPDATE,
            }
          );
          auctionData.id_pemenang = highestBid[0].id_user;
        }
      }

      const totalPenawaranResult = await sequelize.query(
        "SELECT COUNT(*) as total FROM history_lelang WHERE id_lelang = :id",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      const penawaranTerakhirResult = await sequelize.query(
        `SELECT hl.harga_penawaran, hl.id_user, u.username 
      FROM history_lelang hl
      JOIN users u ON u.id_user = hl.id_user
      WHERE hl.id_lelang = :id AND hl.harga_penawaran = :harga_akhir
      ORDER BY hl.id_history DESC
      LIMIT 1`,
        {
          replacements: {
            id,
            harga_akhir: auctionData.harga_akhir,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return res.status(200).send({
        message: "Success",
        data: {
          ...auctionData,
          total_penawaran: totalPenawaranResult[0].total,
          penawaran_terakhir: penawaranTerakhirResult[0] || null,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.post(
    "/auctions/:id",
    { preValidation: [app.authenticate] },
    async (req, res) => {
      try {
        const { id_user, role } = req.user;
        const { id_lelang, id_barang, harga_penawaran } = req.body;

        if (!["masyarakat", "admin"].includes(role)) {
          return res.status(403).send({
            message: "Forbidden",
          });
        }

        if (!id_barang || !id_lelang || !harga_penawaran) {
          return res.status(400).send({
            message: "Bad Request",
            error: "Barang ID, Lelang ID, dan Harga Penawaran wajib diisi",
          });
        }

        const [auction] = await sequelize.query(
          "SELECT * FROM lelangs WHERE id_lelang = :id_lelang",
          {
            replacements: { id_lelang },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        if (!auction) {
          return res.status(404).send({ message: "Auction not found" });
        }

        if (auction.id_pemenang) {
          return res.status(400).send({
            message: "Lelang Ditutup",
            error: "Tidak Bisa Melakukan Penawaran Bodoh",
          });
        }

        if (harga_penawaran < auction.harga_akhir) {
          return res.status(400).send({
            message: "Penawaran terlalu rendah",
            error: `Harga penawaran tidak boleh lebih kecil dari harga akhir saat ini (${auction.harga_akhir})`,
          });
        }

        await sequelize.query(
          `INSERT INTO history_lelang (id_barang, id_lelang, harga_penawaran, id_user)
           VALUES (:id_barang, :id_lelang, :harga_penawaran, :id_user)`,
          {
            replacements: {
              id_barang,
              id_lelang,
              harga_penawaran,
              id_user,
            },
            type: sequelize.QueryTypes.INSERT,
          }
        );

        await sequelize.query(
          `UPDATE lelangs SET harga_akhir = :harga_penawaran WHERE id_lelang = :id_lelang`,
          {
            replacements: {
              harga_penawaran,
              id_lelang,
            },
            type: sequelize.QueryTypes.UPDATE,
          }
        );

        return res.status(201).send({
          message: "Penawaran berhasil",
        });
      } catch (error) {
        console.error(error.message);
        return res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  );

  app.post("/auctions/check-expired", async (req, res) => {
    try {
      const expiredAuctions = await sequelize.query(
        `SELECT * FROM lelangs 
         WHERE tenggat_waktu <= NOW() AND id_pemenang IS NULL`,
        { type: sequelize.QueryTypes.SELECT }
      );

      for (const lelang of expiredAuctions) {
        const highestBid = await sequelize.query(
          `SELECT id_user FROM history_lelang 
           WHERE id_lelang = :id_lelang 
           ORDER BY harga_penawaran DESC LIMIT 1`,
          {
            replacements: { id_lelang: lelang.id_lelang },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        if (highestBid.length > 0) {
          await sequelize.query(
            `UPDATE lelangs 
             SET id_pemenang = :id_user 
             WHERE id_lelang = :id_lelang`,
            {
              replacements: {
                id_user: highestBid[0].id_user,
                id_lelang: lelang.id_lelang,
              },
              type: sequelize.QueryTypes.UPDATE,
            }
          );
        }
      }

      return res.status(200).send({
        message: "Expired auctions processed",
        data: expiredAuctions,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.post(
    "/auctions/:id/close",
    { preValidation: [app.authenticate] },
    async (req, res) => {
      try {
        const { role } = req.user;
        const { id } = req.params;

        // Hanya admin atau petugas yang boleh
        if (!["admin", "petugas"].includes(role)) {
          return res.status(403).send({
            message: "Forbidden",
            error: "Hanya admin atau petugas yang boleh menutup lelang",
          });
        }

        const [auction] = await sequelize.query(
          `SELECT * FROM lelangs WHERE id_lelang = :id`,
          {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        if (!auction) {
          return res.status(404).send({ message: "Lelang tidak ditemukan" });
        }

        if (auction.id_pemenang) {
          return res.status(400).send({
            message: "Lelang sudah ditutup sebelumnya",
          });
        }

        const highestBid = await sequelize.query(
          `SELECT id_user FROM history_lelang 
           WHERE id_lelang = :id 
           ORDER BY harga_penawaran DESC LIMIT 1`,
          {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        if (highestBid.length > 0) {
          await sequelize.query(
            `UPDATE lelangs SET id_pemenang = :id_user WHERE id_lelang = :id`,
            {
              replacements: {
                id_user: highestBid[0].id_user,
                id,
              },
              type: sequelize.QueryTypes.UPDATE,
            }
          );
        } else {
          await sequelize.query(
            `UPDATE lelangs SET id_pemenang = NULL WHERE id_lelang = :id`,
            {
              replacements: { id },
              type: sequelize.QueryTypes.UPDATE,
            }
          );
        }

        return res.status(200).send({
          message: "Lelang berhasil ditutup",
          id_lelang: id,
          id_pemenang: highestBid[0]?.id_user || null,
        });
      } catch (error) {
        console.error(error.message);
        return res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  );

  app.get("/auctions/featured", async (req, res) => {
    try {
      const featuredAuctions = await sequelize.query(
        `
        SELECT 
          l.id_lelang,
          l.id_barang,
          l.tgl_lelang,
          l.harga_akhir,
          l.tenggat_waktu,
          COUNT(h.id_history) AS jumlah_penawaran
        FROM lelangs l
        LEFT JOIN history_lelang h ON l.id_lelang = h.id_lelang
        WHERE l.tenggat_waktu > NOW() AND l.id_pemenang IS NULL
        GROUP BY l.id_lelang
        ORDER BY jumlah_penawaran DESC
        LIMIT 5
      `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return res.status(200).send({
        message: "Featured auctions retrieved successfully",
        data: featuredAuctions,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });
}
