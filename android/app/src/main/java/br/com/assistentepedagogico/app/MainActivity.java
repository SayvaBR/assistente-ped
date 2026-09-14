package br.com.assistentepedagogico.app;

import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    private Insets lastSystemInsets = Insets.NONE;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        installWindowInsetsBridge();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            publishWindowInsets(lastSystemInsets);
        }
    }

    private void installWindowInsetsBridge() {
        View decorView = getWindow().getDecorView();
        ViewCompat.setOnApplyWindowInsetsListener(decorView, (view, windowInsets) -> {
            lastSystemInsets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
            );
            publishWindowInsets(lastSystemInsets);
            return windowInsets;
        });
        ViewCompat.requestApplyInsets(decorView);
    }

    private void publishWindowInsets(Insets insets) {
        if (getBridge() == null || getBridge().getWebView() == null) {
            return;
        }

        WebView webView = getBridge().getWebView();
        float density = getResources().getDisplayMetrics().density;
        int top = WindowInsetsCssBridge.toCssPixels(insets.top, density);
        int right = WindowInsetsCssBridge.toCssPixels(insets.right, density);
        int bottom = WindowInsetsCssBridge.toCssPixels(insets.bottom, density);
        int left = WindowInsetsCssBridge.toCssPixels(insets.left, density);
        String script = "(function(){var r=document.documentElement;"
            + "r.style.setProperty('--android-safe-top','" + top + "px');"
            + "r.style.setProperty('--android-safe-right','" + right + "px');"
            + "r.style.setProperty('--android-safe-bottom','" + bottom + "px');"
            + "r.style.setProperty('--android-safe-left','" + left + "px');"
            + "})()";
        webView.post(() -> webView.evaluateJavascript(script, null));
    }

}
