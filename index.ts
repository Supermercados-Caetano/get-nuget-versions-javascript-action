import * as core from '@actions/core';
import * as github from '@actions/github';
import axios from 'axios';
type PackageResponse = {
	versions: string[],
};
async function run() {
	try {
		const url = 'https://nuget.pkg.github.com/Supermercados-Caetano/download/smcaetano.pdv.core/index.json';//  core.getInput('id');
		const username = 'GuilhermeSmc';
		const password = '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';

		const resp = await axios.get<PackageResponse>(url, { headers: { 'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64') } });
		//console.log(JSON.stringify(resp));
		console.log(resp.data);
		core.setOutput('versions', resp.data.versions);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();