import Container from '@/components/container/PageContainer';
import Gnb from '@/layout/Gnb';

export default function AdminLayout({ children }) {
  return (
    <>
      <Gnb userRole="admin" />
      <Container>{children}</Container>
    </>
  );
}
