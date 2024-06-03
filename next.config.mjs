import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
    ],
  },
};

// export default nextConfig;
export default withNextIntl(nextConfig);
