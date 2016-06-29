/*
 * Copyright (c) 2016 Justin Biard
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 */
package com.kscope.cdf;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 *
 * @author jbiard
 */
public class ProcessStream extends Thread {
    
    InputStream is;
    StreamFilter sf;

    ProcessStream(InputStream is) {
        this.is = is;
        this.sf = null;
    }

    ProcessStream(InputStream is, StreamFilter sf) {
        this.is = is;
        this.sf = sf;
    }

    @Override
    public void run() {
        try {
            BufferedReader br = new BufferedReader(
                                        new InputStreamReader(is));
            String s;
            while ((s = br.readLine()) != null) {
                if (sf != null) {
                    sf.filter(s);
                }
            }
            is = null;
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }
    }
}

/*
 * ie:
 *
 * STDOUT or STDERR to print to the console:
 *     new ProcessStream(p.getInputStream(), new StreamFilter()).start();
 *     new ProcessStream(p.getErrorStream(), new StreamFilter()).start();
 *
 * IGNORE standard output or standard error:
 *     new ProcessStream(p.getInputStream()).start();
 *     new ProcessStream(p.getErrorStream()).start();
 *
 * @see ProcessStream(...)
 */
class StreamFilter {
    public void filter(String s) {
        System.out.println(s);
    }
}
