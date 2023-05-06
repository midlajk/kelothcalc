package com.calculator;

import android.graphics.Typeface;
import android.util.Log;
import android.widget.Toast;

import com.imin.library.SystemPropManager;
import com.imin.printerlib.Callback;
import com.imin.printerlib.IminPrintUtils;
import com.imin.printerlib.print.PrintUtils;
import com.imin.printerlib.util.BmpUtils;
import com.imin.printerlib.util.BytesUtil;
import com.imin.printerlib.util.CodeFormat;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.imin.printerlib.util.ThreadPoolManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class CustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    public static final String NAME = "IminPrinter";
    private static final String TAG = "IminInnerPrinterModule";
    private IminPrintUtils mIminPrintUtils;
    CustomModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        mIminPrintUtils = IminPrintUtils.getInstance(reactContext);
    }




    @ReactMethod
    public  void show(ReadableMap data, String dates) {

        final IminPrintUtils printUtils = mIminPrintUtils;
        printUtils.resetDevice();
        printUtils.initPrinter(IminPrintUtils.PrintConnectType.USB);
        int status = printUtils.getPrinterStatus(IminPrintUtils.PrintConnectType.USB);
        printUtils.setUnderline(false);
        printUtils.setPageFormat(1);
        printUtils.setTextSize(40);
        printUtils.setAlignment(0);
        printUtils.setTextStyle(Typeface.BOLD);
        printUtils.printText("        Keloth Huller\n");
        printUtils.printAndFeedPaper(5);
        printUtils.setTextSize(30);
        printUtils.setTextStyle(Typeface.NORMAL);
        printUtils.printText("                Weight Bill\n");
        printUtils.setAlignment(0);
        printUtils.setTextStyle(Typeface.BOLD);
        printUtils.printAndFeedPaper(20);
        printUtils.printAndFeedPaper(5);
        printUtils.printText("Name : "+data.getString("name")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Product : "+data.getString("product")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Number of bags: "+data.getString("bags")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Total weight : "+data.getString("weight")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Outern : "+data.getString("ot")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Moisture : "+data.getString("mc")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Final Ot : "+data.getString("finalot")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Rate : "+data.getString("price")+"\n");
        printUtils.printAndFeedPaper(2);
        printUtils.printText("Total : "+data.getString("total")+"\n");
        printUtils.printAndFeedPaper(10);
        printUtils.printText("   " + dates +" : \n");
        printUtils.printAndFeedPaper(150);

        printUtils.resetDevice();

    }

    @ReactMethod
    public void initPrinter(final Promise promise){
        final IminPrintUtils printUtils = mIminPrintUtils;
        printUtils.resetDevice();
        printUtils.initPrinter(IminPrintUtils.PrintConnectType.USB);
        int status = printUtils.getPrinterStatus(IminPrintUtils.PrintConnectType.USB);
        printUtils.setUnderline(false);
        printUtils.setPageFormat(0);
        printUtils.setTextSize(30);
        printUtils.setAlignment(0);
        printUtils.setTextStyle(Typeface.BOLD);
        printUtils.printText("      Keloth Huller\n");
        printUtils.setTextSize(26);
        printUtils.setAlignment(0);
        printUtils.setTextStyle(Typeface.NORMAL);
        printUtils.printAndFeedPaper(20);
        printUtils.printAndFeedPaper(5);
        printUtils.printText("Name : \n");
        printUtils.printText("Product : \n");
        printUtils.printText("Number of bags: \n");
        printUtils.printText("Total weight : \n");
        printUtils.printText("Average weight : \n");
        printUtils.printText("Outern : \n");
        printUtils.printText("Moisture : \n");
        printUtils.printText("Final Ot : \n");
        printUtils.printText("Rate : \n");
        printUtils.printText("Total : \n");

        printUtils.printAndFeedPaper(10);
        printUtils.printAndFeedPaper(100);

        printUtils.resetDevice();

    }

    @ReactMethod
    public void printAndLineFeed(final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.printAndLineFeed();
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }

    /**
     * @param height    0 - 255
     * @param promise
     */
    @ReactMethod
    public void printAndFeedPaper(int height, final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        final int mHeight = height;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.printAndFeedPaper(mHeight);
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }

    @ReactMethod
    public void partialCut(final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.partialCut();
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }


    /**
     * @param alignment   0 = Left, 1 = Center, 2 = Right (default 0)
     * @param promise
     */
    @ReactMethod
    public void setAlignment(int alignment, final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        final int mAlignment = alignment;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.setAlignment(mAlignment);
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }

    /**
     * @param size      Font Size (default 28)
     * @param promise
     */
    @ReactMethod
    public void setTextSize(int size, final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        final int mSize = size;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.setTextSize(mSize);
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }

    /**
     * @param style      0 = Normal, 1 = Bold, 2 = Italic, 3 = Bold Italic
     * @param promise
     */
    @ReactMethod
    public void setTextStyle(int style, final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        final int mStyle = style;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.setTextStyle(mStyle);
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }



    @ReactMethod
    public void printText(String text, final Promise promise) {
        final IminPrintUtils printUtils = mIminPrintUtils;
        final String mText = text;
        ThreadPoolManager.getInstance().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    printUtils.printText("sdsd");
                    promise.resolve(null);
                } catch (Exception e) {
                    e.printStackTrace();
                    Log.i(TAG, "ERROR: " + e.getMessage());
                    promise.reject("" + 0, e.getMessage());
                }
            }
        });
    }
    @NonNull
    @Override
    public String getName() {
        return "ABC";
    }
}
