import * as nodePath from 'path';
import argv from './argv';
import isRepositoryRoot from '../utils/is-repository-root';
import getDirectories from '../utils/get-directories';

export default {
	get path() {
		return nodePath.resolve(argv.path || process.cwd());
	},

	get modules() {
		const modules = (argv.modules || '')
			.split(',')
			.map(module => module.trim())
			.filter(module => !!module)
			.map(module => nodePath.resolve(this.path, module));

		if (isRepositoryRoot(this.path) && modules.length === 0) {
			return getDirectories(this.path);
		}

		return modules;
	},

	get name() {
		return argv.name || argv._[1];
	},
};
