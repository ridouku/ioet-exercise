<!-- PROJECT LOGO -->
<br />
<p align="center">

<h3 align="center">IOET EXERCISE</h3>

  <p align="center">
    Exercise to calculate payments by schedule and fees 
    <br /> 
    <br />
    </p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#available_scripts">Available scripts</a></li>
    <li><a href="#solution">Solution</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
</ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The company ACME offers their employees the flexibility to work the hours they want. They will pay for the hours worked based on the day of the week and time of day, according to the following table:

Monday - Friday

00:01 - 09:00 25 USD

09:01 - 18:00 15 USD

18:01 - 00:00 20 USD

Saturday and Sunday

00:01 - 09:00 30 USD

09:01 - 18:00 20 USD

18:01 - 00:00 25 USD

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked. The following abbreviations will be used for entering data:

MO: Monday

TU: Tuesday

WE: Wednesday

TH: Thursday

FR: Friday

SA: Saturday

SU: Sunday

### Built With

This project was build it with:

- [Mocha](https://mochajs.org)
- [Typescript](https://www.typescriptlang.org)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- nodejs

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ridouku/ioet-exercise
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
   
<!-- USAGE EXAMPLES -->

## Usage

If you need change the data to test the project, you can modify the text file in resources/employeeInfo.txt, the file already has data, but you can change it.

Input: the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our two examples below.

Output: indicate how much the employee has to be paid

For example:

Case 1:

INPUT

RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00

OUTPUT:

The amount to pay RENE is: 215 USD

Case 2:

INPUT

ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00

OUTPUT:

The amount to pay ASTRID is: 85 USD

## Available scripts

To test the project, you can run:

```sh
   npm run start
   ```
To run unit test:

```sh
   npm run test:unit
   ```
To generate the coverage of code:

```sh
   npm run test:coverage
   ```
## Solution

First was established the constant data, in this case the rules for schedules, through enums and records, so the rules could be modified o expanded, but the logic is the same.

The text file is read and then iterate through it, in each iteration the text line is analized, to extract the employee's name and the schedule, the schedule is separated by the coma and them each hour is compared with the respective rule of the day. Finally payment info of each employee is returned. 

The architecture is like a microservice, the code is separated in service, constants and types, so keeping files separate for consistency and accountability, and an index file to expose the logic to use.

SOLID principles were used, like single responsibility and strong typing. 

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Bryan Arellano - ridouku@gmail.com
