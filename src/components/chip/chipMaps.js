import ApiChip from "@/components/chip/chipType/ApiChip";
import CareerChip from "@/components/chip/chipType/CareerChip";
import ModernjsChip from "@/components/chip/chipType/ModernjsChip";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import WebChip from "@/components/chip/chipType/WebChip";
import BlogChip from "@/components/chip/chipCategory/BlogChip";
import OfficialDocChip from "@/components/chip/chipCategory/OfficialDocChip";

export const categoryChipMap = {
  API: <ApiChip />,
  Career: <CareerChip />,
  "Modern JS": <ModernjsChip />,
  "Next.js": <NextjsChip />,
  Web: <WebChip />,
};

export const typeChipMap = {
  블로그: <BlogChip />,
  공식문서: <OfficialDocChip />,
};
