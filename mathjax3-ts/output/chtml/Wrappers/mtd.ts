/*************************************************************
 *
 *  Copyright (c) 2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * @fileoverview  Implements the CHTMLmtd wrapper for the MmlMtd object
 *
 * @author dpvc@mathjax.org (Davide Cervone)
 */

import {CHTMLWrapper} from '../Wrapper.js';
import {CHTMLWrapperFactory} from '../WrapperFactory.js';
import {BBox} from '../BBox.js';
import {MmlMtd} from '../../../core/MmlTree/MmlNodes/mtd.js';
import {StyleList} from '../CssStyles.js';

/*****************************************************************/
/*
 * The CHTMLmtd wrapper for the MmlMtd object
 *
 * @template N  The HTMLElement node class
 * @template T  The Text node class
 * @template D  The Document class
 */
export class CHTMLmtd<N, T, D> extends CHTMLWrapper<N, T, D> {
    public static kind = MmlMtd.prototype.kind;

    public static styles: StyleList = {
        'mjx-mtd': {
            display: 'table-cell',
            'text-align': 'center',
            'padding': '.25em .5em'
        },
        'mjx-mtd:first-child': {
            'padding-left': 0
        },
        'mjx-mtd:last-child': {
            'padding-right': 0
        },
        'mjx-mtable > mjx-itable > *:first-child > mjx-mtd': {
            'padding-top': 0
        },
        'mjx-mtable > mjx-itable > *:last-child > mjx-mtd': {
            'padding-bottom': 0
        },
        'mjx-tstrut': {
            display: 'inline-block',
            height: '1em',
            'vertical-align': '-.25em'
        }
    };

    /*
     * @override
     */
    public toCHTML(parent: N) {
        super.toCHTML(parent);
        const ralign = this.node.attributes.get('rowalign') as string;
        const calign = this.node.attributes.get('columnalign') as string;
        if (ralign !== 'baseline' && ralign !== 'axis') {
            this.adaptor.setStyle(this.chtml, 'verticalAlign', (ralign === 'center' ? 'middle' : ralign));
        }
        if (calign !== 'center') {
            this.adaptor.setStyle(this.chtml, 'textAlign', calign);
        }
        //
        // Include a strut to force minimum height and depth
        //
        this.adaptor.append(this.chtml, this.html('mjx-tstrut'));
    }

}
