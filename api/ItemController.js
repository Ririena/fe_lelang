import sequelize from "../db.js ";

export default async function ItemController(app) {
  // app.get("/v2/items", async (req, res) => {
  //   try {
  //     const items = await sequelize.query("SELECT * FROM barangs", {
  //       type: sequelize.QueryTypes.SELECT,
  //     });

  //     return res.status(200).send({
  //       message: "Success",
  //       data: items,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).send({
  //       message: "Internal Server Error",
  //       error: error.message,
  //     });
  //   }
  // });

   app.get("/v2/items", async (req, res) => {
    try {
      const items = await sequelize.query(
        `
        SELECT b.*, l.id_lelang
        FROM barangs b
        LEFT JOIN lelangs l ON b.id_barang = l.id_barang
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );

      return res.status(200).send({
        message: "Success",
        data: items,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.delete("/v2/items/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await sequelize.query(
        "DELETE FROM barangs WHERE id_barang = :id",
        {
          replacements: { id },
          type: sequelize.QueryTypes.DELETE,
        }
      );

      if (result[0] === 0) {
        return res.status(400).send({
          message: "Item Not Found",
        });
      }

      return res.status(200).send({
        message: "Item Deleted Successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.get("/v2/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await sequelize.query(
        "SELECT * FROM barangs WHERE id_barang = :id",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      if (item.length === 0) {
        return res.status(404).send({
          message: "Item not found",
        });
      }

      return res.status(200).send({
        message: "Success",
        data: item[0],
      });
    } catch (error) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.post(
    "/v2/items",
    { preValidation: [app.authenticate] },
    async (req, res) => {
      try {
        const { id_user, role } = req.user;

        if (!["admin", "petugas", "masyarakat"].includes(role)) {
          return res.status(403).send({
            message: "Forbidden",
          });
        }

        const { nama_barang, harga_awal, deskripsi, gambar } = req.body;

        if (!nama_barang || !harga_awal || !deskripsi || !gambar) {
          return res.status(400).send({
            message: "Bad Request",
            error: "Missing required fields",
          });
        }

        await sequelize.query(
          `INSERT INTO barangs (nama_barang, harga_awal, deskripsi, id_user, gambar)
           VALUES (:nama_barang, :harga_awal, :deskripsi, :id_user, :gambar)`,
          {
            replacements: {
              nama_barang,
              harga_awal,
              deskripsi,
              id_user,
              gambar,
            },
            type: sequelize.QueryTypes.INSERT,
          }
        );

        return res.status(201).send({
          message: "Item Created Successfully",
          data: {
            nama_barang,
            harga_awal,
            deskripsi,
            gambar,
            id_user,
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
}
