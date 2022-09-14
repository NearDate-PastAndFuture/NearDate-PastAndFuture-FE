import { useAppContext } from "context/state";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { format_number_2_digit } from "utils/format";
import { loading_screen } from "utils/loading";

interface CalendarProps {
    setDayMonthYear: Function
}

export default function Calendar({ setDayMonthYear }: CalendarProps) {
    const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const { contractNFT } = useAppContext();

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    const [selectMonth, setSelectMonth] = useState<number>(month);
    const [selectYear, setSelectYear] = useState<number>(year);
    const [noOfDay, setNoOfDay] = useState<Array<any>>([]);

    useEffect(() => {
        async function getNoOfDays() {
            if (!contractNFT) return;

            let daysInMonth = new Date(selectYear, selectMonth + 1, 0).getDate();

            // find where to start calendar day of week
            let dayOfWeek = new Date(selectYear, selectMonth).getDay();
            let daysArray = [];

            for (let i = 1; i <= dayOfWeek; i++) {
                daysArray.push(null);
            }

            let data = await Promise.all(new Array(daysInMonth).fill(0).map((_, i) =>
                contractNFT.nft_token({
                    "token_id": `${selectYear}${format_number_2_digit(selectMonth + 1)}${format_number_2_digit(i + 1)}`
                }).then((e: any) => {
                    return {
                        key: i + 1,
                        ...e
                    }
                })
            ));

            data.sort((a, b) => a.key - b.key);
            setNoOfDay(daysArray.concat(data));
        }
        loading_screen(getNoOfDays);
    }, [selectMonth, selectYear, contractNFT]);
    function previousMonth() {
        if (selectMonth == 0) {
            setSelectMonth(11);
            setSelectYear(selectYear - 1);
        } else {
            setSelectMonth(selectMonth - 1);
        }
    }
    function nextMonth() {
        if (selectMonth == 11) {
            setSelectMonth(0);
            setSelectYear(selectYear + 1);
        } else {
            setSelectMonth(selectMonth + 1);
        }
    }

    return (
        <div className="mt-5 wrapper rounded shadow w-full ">
            <div className="header flex justify-between border-b p-2">
                <span className="text-lg font-bold">
                    {selectYear} {MONTH_NAMES[selectMonth]}
                </span>
                <div >
                    <button className="p-1 hover:scale-125 transition-all ease-in-out duration-150" onClick={previousMonth}>
                        <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                            <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
                        </svg>
                    </button>
                    <button className="p-1 hover:scale-125 transition-all ease-in-out duration-150" onClick={nextMonth}>
                        <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                            <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-2 border-r border-l h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Sunday</span>
                            <span className="sm:hidden block">Sun</span>
                        </th>
                        <th className="p-2 border-r h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Monday</span>
                            <span className="sm:hidden block">Mon</span>
                        </th>
                        <th className="p-2 border-r h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Tuesday</span>
                            <span className="sm:hidden block">Tue</span>
                        </th>
                        <th className="p-2 border-r h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Wednesday</span>
                            <span className="sm:hidden block">Wed</span>
                        </th>
                        <th className="p-2 border-r h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Thursday</span>
                            <span className="sm:hidden block">Thu</span>
                        </th>
                        <th className="p-2 border-r h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Friday</span>
                            <span className="sm:hidden block">Fri</span>
                        </th>
                        <th className="p-2 border-r h-10 xl:text-sm text-xs">
                            <span className="sm:block hidden">Saturday</span>
                            <span className="sm:hidden block">Sat</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        noOfDay.map((e, i) => {
                            if (i == 0 || i % 7 == 0) {
                                return (
                                    <tr className="text-center" key={i}>
                                        {
                                            Array(7).fill(0).map((_, no) => {
                                                let ele = noOfDay[i + no];
                                                return (
                                                    <td key={i + no} className={`border transition duration-500 ease-in aspect-square
                                                    ${(ele && ele.token_id == null) ? "cursor-pointer hover:bg-secondary hover:bg-opacity-10 group " : " bg-backgroundLight"}`}>
                                                        <div className="flex flex-col aspect-square xl:w-40 md:w-30 sm:w-20 mx-auto w-10 overflow-hidden items-center justify-center relative">
                                                            {
                                                                ele != null && (
                                                                    <>
                                                                        <span className="top-0 right-0 font-semibold absolute text-primary">{ele.key}</span>
                                                                        {
                                                                            ele.token_id != null && (
                                                                                <div className="group transition-all ease-in-out duration-200">
                                                                                    <span className="bg-purple-400 text-white rounded-sm px-2 p-1 sm:rounded sm:p-1 sm:px-3 text-sm group-hover:hidden"><span className="hidden sm:inline-block">Minted</span></span>
                                                                                    <Link href={`/nft/${ele.token_id}`} passHref>
                                                                                        <a className="bg-purple-400 text-white rounded p-1 px-3 text-sm group-hover:block hidden cursor-pointer">View</a>
                                                                                    </Link>
                                                                                </div>
                                                                            )
                                                                        }
                                                                        <span className=" bg-imageLight text-white rounded p-1 px-3 text-sm hidden group-hover:block hover:scale-110 transition-all duration-150 ease-in-out"
                                                                            onClick={() => setDayMonthYear(parseInt(ele.key, 10), selectMonth, selectYear)}
                                                                        >Mint</span>
                                                                    </>
                                                                )
                                                            }
                                                        </div>
                                                    </td>
                                                );
                                            })
                                        }
                                    </tr>
                                );
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}