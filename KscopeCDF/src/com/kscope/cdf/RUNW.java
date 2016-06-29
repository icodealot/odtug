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

import java.util.Arrays;
import java.io.*;

/**
 *
 * @author jbiard
 */
public class RUNW {
    
    /**
     * Essbase RUNJAVA entry point.
     * @param ctx
     * @param args
     */
    public static void main(com.hyperion.essbase.calculator.Context ctx, String[] args) {

        try {
            ctx.sendMessage(
                    "KscopeCDF: executing RUNW " + Arrays.toString(args)
                    );
            try {
                RUNW.exec(args);
            } catch (Exception ex1) {
                ctx.sendMessage(ex1.getLocalizedMessage());
            }
            
        } catch (Exception ex2) {
            System.out.println(ex2.getLocalizedMessage());
        }
    }

    /**
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        System.out.println(
                    "KscopeCDF: executing RUNW " + Arrays.toString(args)
                    );
        RUNW.exec(args);
    }
    
    /**
     * Executes the specified program and does waits for the batch
     * executable to finish. Various checks should be added inside to 
     * help reduce the probability of issue.
     *
     * @param args
     * @throws Exception
     */
    /**
     * CDF entry point for Calc Blocks which are registered to Essbase
     * as "@JEXECW(...) using the following MaxL snippet.
     *
     *   CREATE OR REPLACE FUNCTION '@JEXECW'
     *   AS 'com.kscope.cdf.RUNW.exec(String[])'
     *   SPEC '@JEXECW(strArgs)'
     *   COMMENT 'Executes a specified program with a list of string parameters and waits.';
     *
     * @param args
     * @throws Exception
     */
    private static void exec(String[] args) throws Exception {

        try {

            String exe = Arrays.toString(args).replaceAll("[\\[\\]\\,]", "");

            System.out.println(exe);

            Process p =
                    Runtime.getRuntime().exec(exe);

            //new ProcessStream(p.getInputStream()).start();
            //new ProcessStream(p.getErrorStream()).start();

            if (p.waitFor() != 0) {
                throw new Exception("[KscopeCDF: exit code = " + p.exitValue() + "]");
            }

            System.out.println("Process started.");

        } catch (Exception e) {
            throw new Exception(
                    "KscopeCDF-ERR: problem executing script. " + e.getLocalizedMessage()
                    );
        }
    }
}
