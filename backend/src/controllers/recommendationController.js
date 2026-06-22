const Recommendation =
  require(
    "../models/Recommendation"
  );

exports.getRecommendations =
  async (req, res) => {
    try {

      const recommendations =
        await Recommendation.find();

      res.json({
        success: true,
        recommendations,
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };