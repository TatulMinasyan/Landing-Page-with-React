import { useEffect, useState } from 'react'
import './Hero.css'
import oval from '../../assets/Oval.png'

const Hero = ({ search }) => {
    const [listData, setListData] = useState([])
    const [filteredListData, setFilteredListData] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        fetch('https://cloud.codesupply.co/endpoint/react/data.json')
            .then(res => res.json())
            .then(data => { setListData(data); setFilteredListData(data) })
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
       const q = (search || '').trim().toLowerCase()
       if (!q) {
         setFilteredListData(listData)
         return
       }
       setFilteredListData(
         listData.filter(i => {
           const title = (i.title || '').toLowerCase()
           const text = (i.text || '').toLowerCase()
           return title.includes(q) || text.includes(q)
         })
       )
    }, [search, listData])

    const openModal = (item) => setSelectedItem(item)
    const closeModal = () => setSelectedItem(null)

    return (
        <div className="Hero">
            <div className='hero-side'>
                {
                    filteredListData.map((item, index) => (
                        <div
                          key={index}
                          className='hero-card'
                          onClick={() => openModal(item)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter') openModal(item) }}
                        >
                            <img src={item.img} alt={item.tags} />
                            <span>{item.tags}</span>
                            <h2>{item.title}</h2>
                            
                            <ul>
                                <li className='autor'>{item.autor}</li>
                                <img src={oval} alt="" />
                                <li>{item.date}</li>
                                <img src={oval} alt="" />
                                <li>{item.views} Views</li>
                            </ul>

                            <p>{item.text}</p>
                        </div>
                    ))
                }
            </div>

            {selectedItem && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal-title">{selectedItem.title}</h2>
                        <p className="modal-text">{selectedItem.text}</p>
                        <button className="modal-close" onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hero
