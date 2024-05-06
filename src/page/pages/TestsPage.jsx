import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { X } from 'lucide-react';
import { Check } from 'lucide-react';

const myCode = `
  function add(a, b) {
    return a + b;
  }
`;

export default function TestsPage() {
  return (
    <Accordion type="single" collapsible className="w-full p-6">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Service XXX</h1>
        <hr />
      </div>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-row">
            $test_name <X color="#dd0000" strokeWidth={4} />
            <Check color="#00d000" strokeWidth={4} />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2	">
            <div>
              $test_code, <pre>{myCode}</pre>
            </div>
            <div>$Test_result_log</div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Its animated by default, but you can disable it if you prefer.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
