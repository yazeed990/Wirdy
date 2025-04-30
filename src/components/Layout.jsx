export default function Layout(props){

    const {children}= props

    const header = (        
        <header>
            <div className="nav-bar">
                <a className="home" href=""><img className="logo-nav" src="public/Screenshot 2025-04-24 170744.png"/>الرئيسية</a>
                <a href="#WhereToStart">كيف أبدأ؟</a>
                <a href="#Days">جدول الحفظ</a>
                <a href="#Ways">منهجيه</a>
            </div>
            <h1 class="text-gradient ">وردي</h1>
            <p><strong>خلصت وردك؟</strong><br/>تسمع عن "أحفظ القران في سنتين، صفحة كل يوم"؟

في أربع..أو حتى في عشر سنين...<br/>

تسجليك لوردك هنا، بيكون أول خطوة.. "يوم1: تم!"<br/> وخطوة وحده راحت همه،

كل يوم في رحلتك الطويلة في حفظ القران بتكون محسوبة

وكل يوم تتركه بيتسجل انك فوته، ولازم تعوضه..خطة واضحة، هدف جليل وغايتنا رضى رب العالمين</p>
        </header>
    )

    const footer = (
        <footer>
            <p>صمم بواسطة <a href="/" target="_blank">يزيد الملق</a></p>
        </footer>
    )

    return(

        <>
        {header}
            {children}
        {footer}
        </>
    )
}