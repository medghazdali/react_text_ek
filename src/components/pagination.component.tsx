import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon} from '@heroicons/react/solid';
import styled from '@emotion/styled';
import {css} from "@emotion/react";


const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  padding: 1rem 0;
  @media (min-width: 640px) {
    padding: 0;
  }
`;

// @ts-ignore
const PaginationItem = styled.span`
  span {
    cursor: pointer;
    padding-top: 1rem;
    display: inline-flex;
    padding-right: 1rem;
    align-items: center;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    color: #ddd;

    &:hover {
      color: gray;
      border-top: 2px solid gray;
    }
  }
`;

export interface PaginationProps {
    page: number;
    total: number;
    setPage: (page: number) => void;
}

export default function PaginationComponent({page, total, setPage}: PaginationProps) {
    return (
        <PaginationContainer>
            <PaginationItem>
                <span
                    onClick={() => page > 1 && setPage(page - 1)}
                >
                    <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    Previous
                </span>
            </PaginationItem>

            <PaginationItem>
                <span
                    onClick={() => page < total && setPage(page + 1)}
                >
                    Next
                    <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </span>
            </PaginationItem>
        </PaginationContainer>
    )
}
