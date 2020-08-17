import React from 'react';
const Login = React.lazy(() => import('./views/login'))
const EventList = React.lazy(() => import('./views/eventList'))
const CreateEvent = React.lazy(() => import('./views/createEvent'));

const routes = [
    // { path: '/', exact: true, name: 'Login', component: Login },
    // { path: '/login', exact: true, name: 'Login', component: Login },
    { path: '/event/create', name: 'Create Events', exact: true, component: CreateEvent },
    { path: '/event/view', name: 'View Events', exact: true, component: EventList },
    { path: '/', exact: true, component: EventList }
]

export default routes;