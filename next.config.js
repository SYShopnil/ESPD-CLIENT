/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cloudflare-ipfs.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/history',
        destination: '/search-result?subject_name=History&subject_id=5',
        permanent: true,
      },
      {
        source: '/italian',
        destination: '/search-result?subject_name=Italian&subject_id=15',
        permanent: true,
      },
      {
        source: '/online-maths-tutors',
        destination: '/search-result?subject_name=Maths&subject_id=4',
        permanent: true,
      },
      {
        source: '/online-music-tutor',
        destination: '/search-result?subject_name=Music&subject_id=18',
        permanent: true,
      },
      {
        source: '/online-physics-tutors',
        destination: '/search-result?subject_name=Physics&subject_id=2',
        permanent: true,
      },
      {
        source: '/psychology',
        destination: '/search-result?subject_name=Psychology&subject_id=9',
        permanent: true,
      },
      {
        source: '/sociology',
        destination: '/search-result?subject_name=Sociology&subject_id=10',
        permanent: true,
      },
      {
        source: '/ancient-history',
        destination: '/search-result?subject_name=Ancient%20History&subject_id=17',
        permanent: true,
      },
      {
        source: '/german',
        destination: '/search-result?subject_name=German&subject_id=14',
        permanent: true,
      },

      {
        source: '/geography',
        destination: '/search-result?subject_name=Geography&subject_id=13',
        permanent: true,
      },
      {
        source: '/online-english-tutors',
        destination: '/search-result?subject_name=English&subject_id=6',
        permanent: true,
      },
      {
        source: '/computer-science',
        destination: '/search-result?subject_name=Computer%20Science&subject_id=7',
        permanent: true,
      },
      {
        source: '/online-chemistry-tutors',
        destination: '/search-result?subject_name=Chemistry&subject_id=1',
        permanent: true,
      },
      {
        source: '/business',
        destination: '/search-result?subject_name=Business&subject_id=21',
        permanent: true,
      },
      {
        source: '/online-biology-tutors',
        destination: '/search-result?subject_name=Biology&subject_id=12',
        permanent: true,
      },

      // confusing destination entries

      // {
      //   source: '/ucas-help',
      //   destination: '/search-result?',
      //   permanent: true,
      // },
      // {
      //   source: '/online-gcse-music-technology-tutor',
      //   destination: '/search-result?',
      //   permanent: true,
      // },
      // {
      //   source: '/online-11plus-exam-tutor',
      //   destination: '/search-result?',
      //   permanent: true,
      // },
      // {
      //   source: '/online-ielts-tutors',
      //   destination: '/search-result?',
      //   permanent: true,
      // },
      // {
      //   source: '/online-esol-tutor',
      //   destination: '/search-result?',
      //   permanent: true,
      // },
      // {
      //   source: '/further-maths',
      //   destination: '/search-result?',
      //   permanent: true,
      // },
     
    ]
  },
};

module.exports = nextConfig;
