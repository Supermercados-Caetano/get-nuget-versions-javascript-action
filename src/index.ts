import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';
type PackageResponse = {
	versions: string[],
};
async function run() {
	try {
		const id = core.getInput('id');
		const url = `https://nuget.pkg.github.com/Supermercados-Caetano/download/${id.toLowerCase()}/index.json`;//  core.getInput('id');
		const username = core.getInput('username');
		const password = core.getInput('password');

		const resp = await axios.get<PackageResponse>(url, { headers: { 'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64') } });
		//console.log(JSON.stringify(resp));
		console.log(resp.data);
		core.setOutput('versions', resp.data.versions);
	} catch (error: any) {
		core.setFailed(error.message);
	}
}

run();