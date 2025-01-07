import { describe, expect, it } from 'vitest';
import { Markdown as MarkdownDll, icons } from '../src/index.js';
import Markdown from '../src/markdown.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Markdown DLL', () => {
	it( 'exports Markdown', () => {
		expect( MarkdownDll ).to.equal( Markdown );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
