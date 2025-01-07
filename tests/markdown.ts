import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { ClassicEditor, Essentials, Paragraph, Heading } from 'ckeditor5';
import Markdown from '../src/markdown.js';

describe( 'Markdown', () => {
	it( 'should be named', () => {
		expect( Markdown.pluginName ).to.equal( 'Markdown' );
	} );

	describe( 'init()', () => {
		let domElement: HTMLElement, editor: ClassicEditor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				licenseKey: 'GPL',
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Markdown
				],
				toolbar: [
					'markdown'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Markdown', () => {
			const myPlugin = editor.plugins.get( 'Markdown' );

			expect( myPlugin ).to.be.an.instanceof( Markdown );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'markdown' ) ).to.equal( true );
		} );

		it( 'should add a text into the editor after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'markdown' );

			expect( editor.getData() ).to.equal( '' );

			icon.fire( 'execute' );

			expect( editor.getData() ).to.equal( '<p>Hello CKEditor 5!</p>' );
		} );
	} );
} );
