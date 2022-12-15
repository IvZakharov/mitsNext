import { MainLayout } from "../../layouts/MainLayout";
import { useMediaQuery, Box, Container } from "@mui/material";

import BlogHero from "../../components/BlogHero/BlogHero";
import PostsGrid from "../../components/PostsGrid/PostsGrid";
import Subscribe from "../../components/Subscribe/Subscribe";

const Posts = ({ posts }) => {
  const matchesMd = useMediaQuery("(min-width: 768px)");

  return (
    <MainLayout
      metaTitle={"MITS – Journal"}
      metaDescription={"MITS"}
      headerTransparent={true}
    >
      <BlogHero title={"MITS JOURNAL"} imagePath={"/images/hero/blog.jpg"} />

      <Container>
        <Box pt={matchesMd ? 12 : 8} pb={matchesMd ? 14 : 8}>
          <PostsGrid posts={posts} />
        </Box>
      </Container>
      <Subscribe />
    </MainLayout>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.API_URL}/posts?sort=createdAt:desc`
  );

  const postsRes = await response.json();

  return {
    props: {
      posts: postsRes.data,
    },
    revalidate: 120,
  };
}

export default Posts;
