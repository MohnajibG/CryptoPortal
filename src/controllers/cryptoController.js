import { getCryptoNews } from "../services/cryptoService.js";
import { analyzeNews } from "../services/analysisService.js";

export const cryptoSummary = async (req, res) => {
  try {
    const news = await getCryptoNews();

    const analysis = analyzeNews(news);

    res.json({
      news,
      ...analysis,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Backend error" });
  }
};
