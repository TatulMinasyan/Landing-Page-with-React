import { useState, useRef, useEffect } from 'react'
import './Header.css'
import logo_icon from '../../assets/Logotype.png'
import search_icon from '../../assets/search-icon.png'

const Header = ({ search, setSearch }) => {
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        if (showInput) inputRef.current?.focus()
    }, [showInput])

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setShowInput(false) }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [])

    return (
        <div className='Header'>
            <div className='logo-side'>
                <div></div>
                <img src={logo_icon} alt="logo-icon" className='logo' />

                {showInput && (
                    <input
                        ref={inputRef}
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onBlur={() => { if (!search) setShowInput(false) }}
                        className='search-input'
                    />
                )}

                <img
                    src={search_icon}
                    alt="search-icon"
                    className='search'
                    onClick={() => setShowInput(true)}
                    role="button"
                />
            </div>

        </div>
    )
}

export default Header