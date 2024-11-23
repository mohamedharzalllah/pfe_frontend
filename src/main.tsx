import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/signup'
import Home from './pages/home/Home'
import Courses from './pages/course/courses'
import Exams from './pages/exam/exams'
import Problems from './pages/problem/problems'
import CoursesCreate from './pages/course/createcourse'
import ProblemsCreate from './pages/problem/createproblem'
import TestCaseCreate from './pages/testcases/createtastcase'
import ProblemsUpdate from './pages/problem/updateproblem'
import UpdateTestCase from './pages/testcases/updatetestcase'
import ExamsCreate from './pages/exam/createexam'
import ExamsUpdate from './pages/exam/updateexam'
import ProblemsSelection from './pages/problemSelection'
import ProblemPage from './pages/problem/problemPage'
import ChaptersCreate from './pages/chapter/createchapter'
import ChaptersUpdate from './pages/chapter/updatechapter'
import CoursesUpdate from './pages/course/updatecourse'
import CoursePage from './pages/course/coursePage'
import ChapterPage from './pages/chapter/chapterPage'

const router = createBrowserRouter ([
  {path:`/chapter/:id`,element:<ChapterPage/>},
  {path:`/course/:id`,element:<CoursePage/>},
  {path:`/testcase/update/:id`,element:<UpdateTestCase/>},
  {path:'/problemsselection/:examId',element:<ProblemsSelection />},
  {path:"/problem/:id" ,element:<ProblemPage />} ,
  {path:'/problems', element:<Problems  />},
  {path:"/exams/update/:id",element:<ExamsUpdate/>},
  {path:'/exams/create',element:<ExamsCreate/>},
  {path:'/problems/create',element:<ProblemsCreate/>},
  {path:"/chapter/create/:courseId",element:<ChaptersCreate/>},
  {path:"/chapter/update/:id",element:<ChaptersUpdate/>},
  {path:"/testcase/:id",element:<TestCaseCreate/>},
  {path:"/problems/update/:id",element:<ProblemsUpdate/>},
  {path:"/courses/update/:id",element:<CoursesUpdate/>},
  {path:'/',element:<Home/>},
  {path:'/courses',element:<Courses/>},
  {path:'/courses/create',element:<CoursesCreate/>},
  {path:'/exams',element:<Exams/>},
  {path:'/login',element:<Login/>},
  {path:'/signup',element:<Signup/>}

])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
