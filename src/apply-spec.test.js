import applySpec from "./apply-spec"
import R from "ramda"

describe('apply-spec', () => {
    it('works with empty spec', () => {
        expect(applySpec({})()).toEqual({});
    });
    it('works with unary functions', () => {
        expect(applySpec({ v: R.inc, u: R.dec })(1)).toEqual({v: 2, u: 0})
    });
    it('works with binary functions', () => {
        expect(applySpec({ sum: R.add })(1, 2)).toEqual({ sum: 3 });
    });
    it('works with nested specs', () => {
        expect(applySpec({ unnested: R.always(0), nested: { sum: R.add } })(1,2)).toEqual({ unnested: 0, nested: { sum: 3 } });
    })
})