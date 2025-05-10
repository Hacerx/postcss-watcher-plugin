import fs from 'fs/promises';
import { existsSync } from 'fs';
import crypto from 'crypto';
import { PluginCreator, Root } from 'postcss';

interface CheckChangesPluginOptions {
    /**
     * Output path of the CSS file
     * @default 'output.css'
     */
    file?: string;
	/**
	 * Function to be called when the CSS file changes
	 * @param diff Object containing the old and new hash values

	 */
    onChange?: (diff: { oldHash: string; newHash: string }) => void | Promise<void>;
}

/**
 * Creates a PostCSS plugin that monitors source file changes and triggers custom actions.
 * 
 * @param opts Options for the plugin, including the output file path and an onChange callback.
 * @returns A PostCSS plugin object with a OnceExit method.
 */
const watcherPluginFn: PluginCreator<CheckChangesPluginOptions> = (opts) => {

	const defaultValues: CheckChangesPluginOptions = {
        file: 'output.css',
        onChange: (diff) => console.log('CSS changed:', diff),
    }

    const privateOptions = { ...defaultValues, ...opts };

	return {
		postcssPlugin: '@hacerx/postcss-watcher-plugin',
		OnceExit: async (root: Root) => {
			const { css } = root.toResult();

			let previousCSS = '';
			if (existsSync(privateOptions.file!)) {
				previousCSS = await fs.readFile(privateOptions.file!, 'utf-8');
			}

			const oldHash = crypto.createHash('sha256').update(previousCSS).digest('hex');
			const newHash = crypto.createHash('sha256').update(css).digest('hex');

			if (oldHash !== newHash) {
				await privateOptions.onChange?.({ oldHash, newHash });
			}
		}
	}
}

watcherPluginFn.postcss = true;

export const watcher = watcherPluginFn;