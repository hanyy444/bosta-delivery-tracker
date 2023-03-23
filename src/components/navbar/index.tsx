import './index.scss'
import { useState, useCallback } from 'react'
import { ArabicLogo } from 'components'
import { FaBars } from 'react-icons/fa'
import { useWindowWidth } from 'hooks'
import Navigation from './navigation'



const Navbar = ({ getTrackingData }: { getTrackingData: (trackingNumber: number) => Promise<void> }) => {
  const windowWidth = useWindowWidth()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)
  const onShowMobileMenu = useCallback(() => setShowMobileMenu(prev => !prev), [])

  return (
    <div className='navbar'>
      <ArabicLogo />
      { windowWidth && windowWidth > 900 ?
        ( <Navigation getTrackingData={getTrackingData} /> ) : (
          <>
            <FaBars onClick={onShowMobileMenu} style={{ width: '3rem', height: '3rem', cursor: 'pointer', marginTop: '-1rem' }}/>
            { showMobileMenu && 
              <div className="mobile-wrapper">
                <Navigation getTrackingData={getTrackingData}/>
              </div>
            }
          </>
        )
      }
    </div>
  )
}

export default Navbar