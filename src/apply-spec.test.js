
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
    });
    it('works with arrays of nested specs', () => {
        expect(applySpec({ unnested: R.always(0), nested: [{ sum: R.add }] })(1, 2)).toEqual({ unnested: 0, nested: [{ sum: 3 }] });
    });
    it('works with arrays of spec objects', () => {
        expect(applySpec([{ sum: R.add }])(1, 2)).toEqual([{ sum: 3 }])
    });
    it('works with arrays of functions', () => {
        expect(applySpec([R.map(R.prop('a')), R.map(R.prop('b'))])([{a: 'a1', b: 'b1'}, {a: 'a2', b: 'b2'}])).toEqual([['a1', 'a2'], ['b1', 'b2']]);
    });
    it('works with a spec defining a map key', () => {
        expect(applySpec({map: R.prop('a')})({a: 1})).toEqual({map: 1});
    });
    it('retains the highest arity', () => {
        const f = applySpec({ 
            f1: R.nAry(2, R.T), 
            f4: R.nAry(3, R.T),
            f2: { f3: { f4: R.nAry(1, R.T)}, f5: R.nAry(2, R.T)}
        })
        expect(f.length).toEqual(3);
    });
    it('returns a curried function', () => {
        expect(applySpec({ sum: R.add })(1)(2)).toEqual({ sum: 3 });
    })
});
