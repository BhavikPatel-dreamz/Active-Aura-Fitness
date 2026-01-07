export type ImageType = {
  url: string;
  alt: string;
  id: number;
};

export type Benefit = {
  side: 'left' | 'right';
  text: string;
  image: ImageType;
};

export type GoalOption = {
  text: string;
  value: string;
};

export type LandingPageData = {
  page_id: number;
  title: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  cta_button_text: string;
  benefits: Benefit[];
  goal_options: GoalOption[];
};

export type LandingApiResponse = {
  success: boolean;
  data: LandingPageData;
};

export type QuizOption = {
  id: string;
  label: string;
  value: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
};

export type QuizResponse = {
  success: boolean;
  data: {
    total: number;
    questions: QuizQuestion[];
  };
};


export type QuizApiResponse = {
  quiz_id: number;
  questions: QuizQuestion[];
};


