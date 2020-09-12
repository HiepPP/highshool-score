import axios from 'axios';
import * as qs from 'querystring';
import * as cheerio from 'cheerio';
import * as  ExcelJS from 'exceljs';
import {Worksheet} from "exceljs";

async function score(): Promise<void> {
    try {
        const max: number = 2077500;
        const min: number = 2000001;
        const urlString: string = "http://diemthi.hcm.edu.vn/Home/Show";
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Score');
        sheet.columns = [
            {header: 'sbd', key: 'sbd', width: 10},
            {header: 'name', key: 'name', width: 20},
            {header: 'dob', key: 'dob', width: 20},
            {header: 'score', key: 'score', width: 50},
        ]
        await FindScore(min, max, urlString, sheet);
        await workbook.xlsx.writeFile('score.xlsx');
    } catch (error) {
        console.log(error)
    }
}

async function FindScore(min: number, max: number, urlString: string, sheet: Worksheet) {
    for (let sbd = min; sbd < max; sbd++) {
        console.log(`0${sbd}`);
        const body = {
            SoBaoDanh: `0${sbd}`
        }
        const response = await axios({
            method: 'post',
            url: urlString,
            data: qs.stringify(body),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            timeout: 10000
        })
        const $ = cheerio.load(response.data);
        const name = $('tbody > tr:nth-child(2) > td:nth-child(1)').text().trim();
        const dob = $('tbody > tr:nth-child(2) > td:nth-child(2)').text().trim();
        const score = $('body > div.container.body-content > table > tbody > tr:nth-child(2) > td:nth-child(3)').text();
        sheet.addRow({
            sbd: `0${sbd}`,
            name: name,
            dob: dob,
            score: score.trim()
        })
    }
}


const foo = async () => {
    const bar = await score();
};

foo();