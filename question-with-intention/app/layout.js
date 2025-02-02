import "./globals.css";


export const metadata = {
  title: "Kobe's Question",
  description: "To Kaitlyn",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        {children}
      </body>
    </html>
  );
}
