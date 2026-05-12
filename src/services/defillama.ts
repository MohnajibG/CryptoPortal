// services/defillama.ts
export type Dapp = {
  id: string;
  name: string;
  description?: string;
  url?: string;
  category?: string;
  tvl?: number;
};

type DefiLlamaProtocol = {
  slug: string;
  name: string;
  description?: string;
  url?: string;
  category?: string;
  tvl?: number;
};

export const fetchDapps = async (): Promise<Dapp[]> => {
  const res = await fetch("https://api.llama.fi/protocols");

  if (!res.ok) throw new Error("DefiLlama API error");

  const data: DefiLlamaProtocol[] = await res.json();

  return data.map((d) => ({
    id: d.slug,
    name: d.name,
    description: d.description,
    url: d.url,
    category: d.category,
    tvl: d.tvl,
  }));
};
