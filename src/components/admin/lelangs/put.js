app.put(
  "/auctions/:id",
  { preValidation: [app.authenticate] },
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status, tenggatWaktu } = req.body;

      const auction = await sequelize.query(
        "SELECT * FROM lelangs WHERE id_lelang = :id",
        {
          replacements: { id },
          type: sequelize.QueryTypes.SELECT,
          plain: true,
        }
      );

      if (!auction) {
        return res.status(404).send({
          message: "Auction not found",
        });
      }

      const newStatus = status || auction.status;

      let newTenggat = auction.tenggat_waktu;

      if (status === "tutup" || status === "ditutup") {

        newTenggat = new Date();
      } else if (typeof tenggatWaktu === "string" && tenggatWaktu.trim() !== "") {

        const parsedDate = Date.parse(tenggatWaktu);
        if (isNaN(parsedDate)) {
          return res.status(400).send({
            message: "Bad Request",
            error: "Invalid tenggat_waktu format",
          });
        }
        newTenggat = new Date(parsedDate);
      }

      await sequelize.query(
        `UPDATE lelangs SET status = :status, tenggat_waktu = :tenggat_waktu WHERE id_lelang = :id`,
        {
          replacements: {
            id,
            status: newStatus,
            tenggat_waktu: newTenggat,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );

      return res.status(200).send({
        message: "Auction updated successfully",
        data: {
          id,
          status: newStatus,
          tenggat_waktu: newTenggat,
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
