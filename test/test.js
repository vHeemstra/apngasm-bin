// import fs from 'node:fs';
import path from 'node:path';
// import process from 'node:process';
import {fileURLToPath} from 'node:url';
import test from 'ava';
import {execa} from 'execa';
import {temporaryDirectoryTask} from 'tempy';
import binCheck from 'bin-check';
// import binBuild from 'bin-build';
import compareSize from 'compare-size';
import apngasm from '../index.js';

// const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));

// TODO: make binary building
// test('rebuild the apngasm binaries', async t => {
// 	// Skip the test on Windows
// 	if (process.platform === 'win32') {
// 		t.pass();
// 		return;
// 	}

// 	const temporary = temporaryDirectory();
// 	const source = fileURLToPath(new URL(`../vendor/source/apngasm-${pkg.lib_version}-src.zip`, import.meta.url));

// 	await binBuild.file(source, [
// 		`./configure --disable-shared --prefix="${temporary}" --bindir="${temporary}"`,
// 		'make && make install',
// 	]);

// 	t.true(fs.existsSync(path.join(temporary, 'apngasm')));
// });

test('return path to binary and verify that it is working', async t => {
	t.true(await binCheck(apngasm, []).then(() => true).catch(error => error.message.includes('APNG Assembler 2.91')));
});

test('assembles APNG from separate frame files', async t => {
	const [dest, expected, result] = await temporaryDirectoryTask(async (temporary) => {
		const src = fileURLToPath(new URL('fixtures/input-separate-frame*.png', import.meta.url));
		const expected = fileURLToPath(new URL('fixtures/expected-separate.png', import.meta.url));
		const dest = path.join(temporary, 'output-separate.png');
		const args = [
			dest,
			src
		];

		await execa(apngasm, args);
		return [
			dest,
			expected,
			await compareSize(expected, dest)
		];
	});

	t.true(result[dest] > 0);
	t.true(result[dest] === result[expected]);
});

test('assembles APNG from single strip file', async t => {
	const [dest, expected, result] = await temporaryDirectoryTask(async (temporary) => {
		const src = fileURLToPath(new URL('fixtures/input-strip.png', import.meta.url));
		const expected = fileURLToPath(new URL('fixtures/expected-strip.png', import.meta.url));
		const dest = path.join(temporary, 'output-strip.png');
		const args = [
			dest,
			src,
			1,
			24,
			'-hs29'
		];

		await execa(apngasm, args);
		return [
			dest,
			expected,
			await compareSize(expected, dest)
		];
	});

	t.true(result[dest] > 0);
	t.true(result[dest] === result[expected]);
});
