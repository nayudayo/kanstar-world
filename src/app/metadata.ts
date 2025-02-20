import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanstar World",
  description: "Come to our world!",
  icons: {
    icon: [
      {
        url: '/@website-logo.png',
        sizes: 'any',
        type: 'image/png',
      }
    ]
  },
  other: {
    'scroll-restoration': 'manual'
  }
}; 