import { wrapper } from 'lib/store'
import 'styles/styles.css'

// eslint-disable-next-line
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
