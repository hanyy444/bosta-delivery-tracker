import './index.scss'
import {FaSearch} from 'react-icons/fa'
import { useRef, useState, useCallback, useEffect } from 'react'

const Navigation = ({ getTrackingData }: { getTrackingData: (trackingNumber: number) => Promise<void> }) => {
    const trackingInput = useRef<HTMLInputElement | null>(null) 
  
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    
    const onClickSearch = useCallback(() => {
      const trackingNumber = trackingInput.current?.value
      if (trackingNumber?.trim()) getTrackingData(+trackingNumber)
      setShowDropdown(false)
    }, [getTrackingData])

    const onClickDropdown = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.target === e.currentTarget) setShowDropdown(prev => !prev)
    }, [])

    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        onClickSearch()
      }
    }, []);
    
    return (
      <>
        <nav className='nav'>
            <a className="nav-link">الرئيسية</a>
            <a className="nav-link">الاسعار</a>
            <a className="nav-link">كلم المبيعات</a>
        </nav>
        <div className="controls">
          <a 
            className="nav-link with-chevron"
            onClick={onClickDropdown}
            onFocus={()=>setShowDropdown(true)}>
            تتبع شحنتك
                {
                    showDropdown && 
                    <div className='dropdown'>
                        <div>
                        <FaSearch onClick={onClickSearch} />
                        <input type="text" ref={trackingInput} placeholder="رقم التتبع" onKeyDown={onKeyDown}/>
                        </div>
                    </div>
                }
            </a>
            <span className="divider" />
            <a className="nav-link">تسجيل الدخول</a>
            <button type='button'>ENG</button>
        </div>
      </>
    )
}

export default Navigation