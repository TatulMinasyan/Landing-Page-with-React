import './Menu.css'
import chevron_down from '../../assets/Path.png'
import { useEffect, useState, useRef } from 'react'

const Menu = () => {

    const [isSticky, setIsSticky] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [headerHeight, setHeaderHeight] = useState(0)
    const rafRef = useRef(null)

    const stickyStartRef = useRef(null)

   const [isMobileOpen, setIsMobileOpen] = useState(false)
   const mobileRef = useRef(null)

   useEffect(() => {
     if (!isMobileOpen) return
     const onDocClick = (e) => {
       if (mobileRef.current && !mobileRef.current.contains(e.target)) setIsMobileOpen(false)
     }
     document.addEventListener('mousedown', onDocClick)
     return () => document.removeEventListener('mousedown', onDocClick)
   }, [isMobileOpen])

    useEffect(() => {
        const update = () => {
            const header = document.querySelector('.Header')
            const hh = header ? header.offsetHeight : 80
            setHeaderHeight(hh)

            const sc = window.scrollY || window.pageYOffset
            const stickyPoint = hh

            if (sc <= stickyPoint) {
                stickyStartRef.current = null
                setIsSticky(false)
                setIsHidden(false)
                return
            }

            if (!stickyStartRef.current) stickyStartRef.current = sc
            setIsSticky(true)

            const hideThreshold = stickyStartRef.current + 200
            setIsHidden(sc > hideThreshold)
        }

        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(update)
        }

        const onResize = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(update)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        update()

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <div
          className={`Menu ${isSticky ? 'is-sticky' : ''} ${isHidden ? 'is-hidden' : ''}`}
          style={isSticky ? { top: `${headerHeight}px` } : undefined}
        >
           {!isMobileOpen && (
             <button
               className="mobile-toggle"
               aria-expanded={isMobileOpen}
               aria-label="Open menu"
               onClick={() => setIsMobileOpen(true)}
             >
               ☰
             </button>
           )}
            <div className='menu-side'>
                <ul>
                    <li>
                        <p>Demos</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li className="has-dropdown">
                        <p>Post</p>
                        <img src={chevron_down} alt="" />
                        
                        <div className="dropdown" role="menu" aria-hidden="true">
                          <p role="menuitem">Post Header</p>
                          <p role="menuitem">Post Layout</p>
                          <p role="menuitem">Share Buttons</p>
                          <p role="menuitem">Gallery Post</p>
                          <p role="menuitem">Video Post</p>
                        </div>

                    </li>
                    <li>
                        <p>Features</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Categories</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Shop</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Buy Now</p>
                    </li>
                </ul>
            </div>

           <div className={`mobile-overlay ${isMobileOpen ? 'open' : ''}`} onClick={() => setIsMobileOpen(false)}>
             <nav
               className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}
               ref={mobileRef}
               onClick={(e) => e.stopPropagation()}
               aria-hidden={!isMobileOpen}
             >
               <button className="mobile-close" onClick={(e) => { e.stopPropagation(); setIsMobileOpen(false); }} aria-label="close">X</button>
                <ul>
                    <li>
                        <p>Demos</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Post</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Features</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Categories</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Shop</p>
                        <img src={chevron_down} alt="" />
                    </li>
                    <li>
                        <p>Buy Now</p>
                        <img src={chevron_down} alt="" />
                    </li>
                </ul>
              </nav>
            </div>
        </div>
    )
}

export default Menu