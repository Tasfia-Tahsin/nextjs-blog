import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Image from 'next/image'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey there, it's Tasfia. This is my personal blog to share with yoy my travel experiences</p>
        <p>
          (For more details and updates follow me on Instagram as {' '}
          <a href="https://www.instagram.com/mle_na/">Emili</a>.)
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <div className={utilStyles.grid}>
          {allPostsData.map(({ id, date, title, thumbnailPath }) => (
            <div className={utilStyles.listItem} key={id}>
              <Image
              priority
              src={thumbnailPath}
              className={utilStyles.borderSquare}
              height={144}
              width={144}
              alt=""
            />
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}