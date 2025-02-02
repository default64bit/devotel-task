## Installation

Clone this repository and run this command:

```bash
$ npm i
$ npx prisma generate
```

Setup the databse of your choice, then connect it using the provided **.env** variable

Then push the database schema with this command:

```bash
$ npx prisma db push
```

## Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
```

the server should run at port 3000 of your local machine

## Test

```bash
$ npm run test
```

## Cron Jobs

There is cron job to fetch data regularly. You can config it via it's config file at `src/scheduler/cron.config.ts`

## API list

- `/api/job-offers` : for listing of job-offers saved in the database

**Method** : GET

**Parameters** :
| name | required | type | Default |
| ---- | ------ | ------ | ---- |
search | optional | string
page | optional | number
perPage| optional | number
sortBy | optional | ['job_code', 'salary_min', 'salary_max', 'experience', 'created_at']
sortType | optional | ['asc', 'desc'] | 'desc'

**example** :`localhost:3000/api/job-offers?search=Frontend&page=1`

**response** :
```Json
{
    "records": [
        {
          "id": 6,
          "job_code": "P1-542",
          "title": "Frontend Developer",
          "location": "San Francisco, CA",
          "job_type": "parttime",
          "salary_min": "89k",
          "salary_max": "149k",
          "salary_unit": "$",
          "company": "BackEnd Solutions",
          "industry": "Solutions",
          "website": "",
          "skills": "JavaScript,Node.js,React",
          "experience": 0,
          "posted_at": "2025-01-28T15:08:06.183Z",
          "created_at": "2025-02-01T22:50:20.380Z"
        },
        ...
    ],
    "totalCount": 6,
    "totalPages": 1,
    "currentPage": "1"
}
```
