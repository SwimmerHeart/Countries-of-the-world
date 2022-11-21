import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {IoChevronDown, IoClose} from "react-icons/io5";
import {PopupClick, TSortProps} from "../types/types";

const SortBlock = styled.div`
  width: 200px;
  height: 50px;
  background-color: var(--color-ui-base);
  border-radius: 8px;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  @media(max-width: 767px){
    padding: 1rem 1rem;
  }
  @media(max-width: 480px){
    width: 100%;
  }
`
const SortList = styled.ul`
  width: 200px;
  position: absolute;
  top: 3rem;
  left: 0;
`
const SortItem = styled.li`
  background-color: var(--color-ui-base);
  list-style: none;
  padding: 1rem 2rem;

  :hover {
    background-color: var(--color-bg);
  }
`
const listRegion = ['Africa', 'Asia', 'Americas', 'Europe', 'Oceania']

const Sort:React.FC<TSortProps> = ({sort,setSort}) => {
    const [open, setOpen] = useState(false)
    const sortRef = useRef<HTMLDivElement>(null)
    const onClickSort = (item:string) => {
        setSort(item)
    }

    useEffect(() => {
        const onCloseWindowSort = (e:MouseEvent)=>{
            const _e = e as MouseEvent & PopupClick
            if (sortRef.current && !_e.path.includes(sortRef.current)) {
                setOpen(false)
            }
        }
        document.body.addEventListener('click',onCloseWindowSort )
    }, [])

    return (
        <SortBlock onClick={() => setOpen(prev => !prev)}
                   ref={sortRef}
        >
            <div>{sort ? sort : 'Filter by Region'}</div>
            {sort ? <IoClose onClick={()=>setSort('')}/> : <IoChevronDown/>}
            <SortList>
                {open && listRegion.map((item, index) => <SortItem key={index}
                                                                   onClick={() => onClickSort(item)}
                >{item}</SortItem>)}
            </SortList>
        </SortBlock>
    );
};

export default Sort;