'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type HomeFilterOptionsProps = {
  activeBtn: string
  handleFilter: Function
}

const data = [
  {
    id: 1,
    href: '',
    text: 'Top-Up',
  },
  {
    id: 2,
    href: '',
    text: 'Plans',
  },
]

const HomeFilterOptions: React.FC<HomeFilterOptionsProps> = ({
  activeBtn,
  handleFilter,
}) => {
  return (
    <div
      style={{ width: '100%' }}
      className="fasilities__inner d-flex align-items-center justify-content-center"
    >
      {data.map((item) => {
        const isActive = activeBtn === item.text
        return (
          <button
            key={item.id}
            onClick={(e) => {
              handleFilter(item.text)
            }}
            className={`fasilities__item align-items-center d-flex justify-content-center ${
              isActive ? 'cmn__btn' : 'cmn__btn'
            }`}
            style={{
              flex: '1 1 auto',
              minWidth: 'auto',
              padding: '10px 20px',
              margin: '0 10px',
              maxWidth: '200px',

              borderRadius: '8px',
              transition: 'all 0.3s ease',
              textDecoration: 'none',

              cursor: 'pointer',
            }}
          >
            <span
              className="fz-18 pratext d-block"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
              }}
            >
              {item.text}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default HomeFilterOptions
