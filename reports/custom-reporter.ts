import { Reporter, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Custom reporter for generating detailed test reports
 */
class CustomReporter implements Reporter {
    private results: any[] = [];
    private startTime: Date = new Date();

    onBegin() {
        this.startTime = new Date();
        console.log('\n🎭 Starting Playwright Test Execution...\n');
    }

    onTestBegin(test: TestCase) {
        console.log(`▶️  Running: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const status = result.status;
        const icon = status === 'passed' ? '✅' : status === 'failed' ? '❌' : '⚠️';

        console.log(`${icon} ${test.title} - ${status} (${result.duration}ms)`);

        this.results.push({
            title: test.title,
            file: test.location.file,
            line: test.location.line,
            status: result.status,
            duration: result.duration,
            error: result.error?.message,
            errorStack: result.error?.stack,
            timestamp: new Date().toISOString(),
            retries: result.retry
        });
    }

    onEnd(result: FullResult) {
        const endTime = new Date();
        const duration = endTime.getTime() - this.startTime.getTime();

        const summary = {
            total: this.results.length,
            passed: this.results.filter(r => r.status === 'passed').length,
            failed: this.results.filter(r => r.status === 'failed').length,
            skipped: this.results.filter(r => r.status === 'skipped').length,
            flaky: this.results.filter(r => r.status === 'passed' && r.retries > 0).length,
            duration: duration,
            startTime: this.startTime.toISOString(),
            endTime: endTime.toISOString(),
            status: result.status,
            results: this.results
        };

        // Ensure reports directory exists
        const reportsDir = path.join(process.cwd(), 'reports');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        // Write JSON report
        fs.writeFileSync(
            path.join(reportsDir, 'custom-report.json'),
            JSON.stringify(summary, null, 2)
        );

        // Write summary to console
        console.log('\n' + '='.repeat(60));
        console.log('📊 Test Execution Summary');
        console.log('='.repeat(60));
        console.log(`Total Tests:    ${summary.total}`);
        console.log(`✅ Passed:      ${summary.passed}`);
        console.log(`❌ Failed:      ${summary.failed}`);
        console.log(`⚠️  Skipped:     ${summary.skipped}`);
        console.log(`🔄 Flaky:       ${summary.flaky}`);
        console.log(`⏱️  Duration:    ${(duration / 1000).toFixed(2)}s`);
        console.log('='.repeat(60) + '\n');

        if (summary.failed > 0) {
            console.log('❌ Failed Tests:');
            this.results
                .filter(r => r.status === 'failed')
                .forEach(r => {
                    console.log(`  - ${r.title}`);
                    if (r.error) {
                        console.log(`    Error: ${r.error}`);
                    }
                });
            console.log('');
        }

        console.log(`📄 Custom report saved to: ${path.join(reportsDir, 'custom-report.json')}\n`);
    }
}

export default CustomReporter;
