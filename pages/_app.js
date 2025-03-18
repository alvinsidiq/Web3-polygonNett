import Layout from "../components/layout/layout"
import Header from "../components/layout/Header"
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
