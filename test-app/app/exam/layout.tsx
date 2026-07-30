import { ExamProvider } from "@/components/exam/ExamContext";

export default function ExamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ExamProvider>{children}</ExamProvider>;
}
