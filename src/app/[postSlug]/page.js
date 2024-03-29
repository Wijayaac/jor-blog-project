import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import { loadBlogPost } from "@/helpers/file-helpers";

import { BLOG_TITLE } from "@/constants";

import BlogHero from "@/components/BlogHero";
import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";
import CircularColorsDemo from "@/components/CircularColorsDemo";
import CodeSnippet from "@/components/CodeSnippet";

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  return {
    title: `${frontmatter.title} | ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title={frontmatter.title} publishedOn={frontmatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ DivisionGroupsDemo, CircularColorsDemo, pre: CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;
