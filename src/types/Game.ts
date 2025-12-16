export type GameBase = {
  id: number;
  title: string;
  description: string;
  image: string;
  popularity: number;
};

export type GameDetail = GameBase & {
  fullDescription: string;
  genre: string;
  releaseYear: number;

  tags: string[];
  similarIds?: number[];
};