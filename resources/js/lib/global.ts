import { differenceInCalendarDays, differenceInHours, getSeconds } from "date-fns"
import { History, House, FileCheck2, Target, Trash2, Cog, Users, StepBack, UserPlus, Notebook, LucideProps } from 'lucide-react';

export function checkDateValues (start: string, end: string) {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const startIsInPass = differenceInCalendarDays(startDate, new Date()) < 0
    const endIsInPass = differenceInCalendarDays(endDate, new Date()) < 0
    if (differenceInCalendarDays(endDate, startDate) < 0) {
      throw new Error('deadline must to be greatend than start date')
    }
    if (endIsInPass) {
      throw new Error('you cannot schedule task in the past')
    }
}

export function checkTimeValues (date: string, start_time: string, end_time: string) {
    const currStartDate = `${date}T${start_time}.000Z`
    const currEndDate = `${date}T${end_time}.000Z`
    const currDate = new Date()
    const startispass = differenceInHours(currStartDate, currDate) < 0
    const endispass = differenceInHours(currEndDate, currDate) < 0
    if (getSeconds(new Date(currStartDate)) > getSeconds(new Date(currEndDate))) {
      throw new Error('end time has to be greatten than start time')
    }
    if (startispass || endispass) {
      throw new Error('you cannot schedule task in the past')
    }
  }

export function checkTimes (date: string, start_time: string, end_time: string) {
    const currStartDate = `${date}T${start_time}.000Z`
    const currEndDate = `${date}T${end_time}.000Z`
    if (new Date(currStartDate).getTime() < new Date(currEndDate).getTime()) {
      throw new Error('end time has to be greatten than start time')
    }
}

export function verifyCompanyId () {
  if (localStorage.getItem('company_id')) {
      return localStorage.getItem('company_id')
  } else {
      return false
  }
}

export function verifyTeamId () {
  if (localStorage.getItem('team_id')) {
    return localStorage.getItem('team_id')
  } else {
    return false
  }
}

export function verifyTeamName () {
  if (localStorage.getItem('team_name')) {
    return localStorage.getItem('team_name')
  } else {
      return false
  }
}

export function get_company_route () {
  if (localStorage.getItem('company_id')) {
      const company_id = localStorage.getItem('company_id')
      return [
          {
              title: 'Home',
              icon: House,
              href:  `/company/${company_id}`
          },
          {
              title: 'Menbers',
              icon: Users,
              href: `/company/${company_id}/menbers`
          },
          {
              title: 'Meetings',
              icon: Notebook,
              href: `/company/${company_id}/meetings`
          },
      ]
  } else {
      window.location.assign('/user');
  }
}

export function get_team_route () {
  if (localStorage.getItem('team_id')) {
    const company_id = verifyCompanyId()
    const team_id = localStorage.getItem('team_id')
    return [
      {
          title: 'Tasks',
          icon: FileCheck2,
          href:  `/company/${company_id}/team/${team_id}/task`
      },
      {
          title: 'Projects',
          icon: Target,
          href: `/company/${company_id}/team/${team_id}/projects`
      },
      {
          title: 'History',
          icon: History,
          href: `/company/${company_id}/team/${team_id}/historique`
      },
      {
          title: 'Trash',
          icon: Trash2,
          href: `/company/${company_id}/team/${team_id}/trash`
      },
      {
          title: "Settings",
          icon: Cog,
          href: `/company/${company_id}/team/${team_id}/setting`
      },
    ]
  }
}