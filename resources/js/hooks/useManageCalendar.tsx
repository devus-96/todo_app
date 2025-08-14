import { eachDayOfInterval, format, getDate, getMonth, getYear, set } from "date-fns"

export type task = {
  [key: string] : tabTask[]
}

export type tabTask = {
      "id": string,
        "name": string,
        "creation": string,
        "start_time": string,
        "end_time": string,
        "start_date":string,
        "status": string,
        "description": string
}

export type separeType = [string, tabTask[]] 

export function useManageCalendar (date: Date) {
     const thisSaturday = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) + 6})
     const dayOfWeek = eachDayOfInterval({start: date, end: new Date(thisSaturday)})
     
    function converToTime (time: string) {
        const tab = time?.split(' ')
        if (tab[1] === 'PM') {
          let number = 0
          const tabTime = tab[0].split(':')
          if (tabTime[0] !== '12') {
            number = ((parseInt(tabTime[0]) + 12) * 60) + parseInt(tabTime[1])
          } else {
            number = (12 * 60) + parseInt(tabTime[1])
          }
          return number
        } else {
          let number = 0
          const tabTime = tab[0].split(':')
          if (tabTime[0] !== '12') {
            number = (parseInt(tabTime[0]) * 60) + parseInt(tabTime[1])
          } else {
            number = parseInt(tabTime[1])
          }
          return number
        }
    }

    function converToMinute (startTime: string, endTime: string) {
          const start = converToTime(startTime)
          const end = converToTime(endTime)
          const result = (end - start) / 60
          if (result > 1) {
              return result
          }
          return 1
    }

    function converToText (enter: any) {
        let tab: string[] = []
        for (let [key, _] of Object.entries(enter)) {
            tab = [...tab, key]
        }

        return tab
    }

    function separe (data: task) {
        if (data) {
          let tab: separeType[] = []
          for (const [key, value] of Object.entries(data)) {
            tab = [...tab, [key, value]]
          }
  
          return tab
        }
      }

      function currDate (startDate: string) {
        const currDate = format(new Date(), "dd/MM/yyyy")
        if (currDate === startDate) {
            return true
        }
      }

      function currTask (start: string, end: string, startDate: string) {
        const current = new Date().getHours() * 60 + new Date().getMinutes() 
        const currDate = format(new Date(), "dd/MM/yyyy")
        const startTask = parseInt(start?.split(':')[0]) * 60 + parseInt(start?.split(':')[1])
        const endTask = parseInt(end?.split(':')[0]) * 60 + parseInt(end?.split(':')[1])

        if ((startTask <= current) && (current <= endTask) && currDate === startDate) {
            return true
        }
        return false
      }

      function progress (end: string, start: string) {
        const current = new Date().getHours() * 60 + new Date().getMinutes() 
        const endTask = parseInt(end?.split(':')[0]) * 60 + parseInt(end?.split(':')[1])
        const startTask = parseInt(start?.split(':')[0]) * 60 + parseInt(start?.split(':')[1])

        const plage = endTask - startTask
        const plage2 = endTask - current

        return (plage2/plage) * 100
      }

      function difference (start: string, end: string) {
        const minuteStart = parseInt(start?.split(":")[0]) * 60 + parseInt(start?.split(":")[1])
        const minutesEnd = parseInt(end?.split(":")[0]) * 60 + parseInt(end?.split(":")[1])

        const difference = minutesEnd - minuteStart

        return `${(difference - (difference%60)) / 60}h${difference%60}min `

      }

      function sortByTime (start: tabTask, end: tabTask) {
        const minuteStart = parseInt(start?.start_time?.split(":")[0]) * 60 + parseInt(start?.start_time?.split(":")[1])
        const minutesEnd = parseInt(end?.start_time?.split(":")[0]) * 60 + parseInt(end?.start_time?.split(":")[1])

        return minuteStart - minutesEnd

      }

      function convertEachDay (days: any[]) {
        const tab = days.map((item, index) => {
            return format(item, 'yyyy-MM-dd')
        })
        return tab
    }   

    function verifyDate (value: any) {
      if (new Date(value.start_date).getTime() > new Date(value.deadline).getTime()) {
          //throw new Error('check your date! start date is greatter than deadline')
      }
    }
    return {
        verifyDate,
        converToMinute,
        converToTime,
        converToText,
        separe,
        dayOfWeek,
        difference,
        sortByTime,
        currTask,
        currDate,
        progress,
        convertEachDay,
    }
}