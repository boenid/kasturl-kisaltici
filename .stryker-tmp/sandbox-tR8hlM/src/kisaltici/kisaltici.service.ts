// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
@Injectable()
export class KisalticiService {
  private readonly karakter_kumesi = stryMutAct_9fa48("3") ? "" : (stryCov_9fa48("3"), '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');
  constructor(@InjectRepository(Url)
  private urlRepo: Repository<Url>) {}
  kodla(sayi: number): string {
    if (stryMutAct_9fa48("4")) {
      {}
    } else {
      stryCov_9fa48("4");
      if (stryMutAct_9fa48("7") ? sayi !== 0 : stryMutAct_9fa48("6") ? false : stryMutAct_9fa48("5") ? true : (stryCov_9fa48("5", "6", "7"), sayi === 0)) return this.karakter_kumesi[0];
      let kodlanmis = stryMutAct_9fa48("8") ? "Stryker was here!" : (stryCov_9fa48("8"), '');
      while (stryMutAct_9fa48("11") ? sayi <= 0 : stryMutAct_9fa48("10") ? sayi >= 0 : stryMutAct_9fa48("9") ? false : (stryCov_9fa48("9", "10", "11"), sayi > 0)) {
        if (stryMutAct_9fa48("12")) {
          {}
        } else {
          stryCov_9fa48("12");
          const kalan = stryMutAct_9fa48("13") ? sayi * 62 : (stryCov_9fa48("13"), sayi % 62);
          kodlanmis = stryMutAct_9fa48("14") ? this.karakter_kumesi[kalan] - kodlanmis : (stryCov_9fa48("14"), this.karakter_kumesi[kalan] + kodlanmis);
          sayi = Math.floor(stryMutAct_9fa48("15") ? sayi * 62 : (stryCov_9fa48("15"), sayi / 62));
        }
      }
      return kodlanmis;
    }
  }
  async kisalt(asilUrl: string): Promise<string> {
    if (stryMutAct_9fa48("16")) {
      {}
    } else {
      stryCov_9fa48("16");
      const yeniUrl = this.urlRepo.create(stryMutAct_9fa48("17") ? {} : (stryCov_9fa48("17"), {
        asilUrl
      }));
      const kayitliUrl = await this.urlRepo.save(yeniUrl);
      const kod = this.kodla(kayitliUrl.id);
      kayitliUrl.kisaKod = kod;
      await this.urlRepo.save(kayitliUrl);
      return kod;
    }
  }
  async retrieve(kod: string): Promise<string> {
    if (stryMutAct_9fa48("18")) {
      {}
    } else {
      stryCov_9fa48("18");
      const url = await this.urlRepo.findOneBy(stryMutAct_9fa48("19") ? {} : (stryCov_9fa48("19"), {
        kisaKod: kod
      }));
      if (stryMutAct_9fa48("22") ? false : stryMutAct_9fa48("21") ? true : stryMutAct_9fa48("20") ? url : (stryCov_9fa48("20", "21", "22"), !url)) {
        if (stryMutAct_9fa48("23")) {
          {}
        } else {
          stryCov_9fa48("23");
          throw new NotFoundException(stryMutAct_9fa48("24") ? "" : (stryCov_9fa48("24"), 'böyle bir kısa kod yok'));
        }
      }
      return url.asilUrl;
    }
  }
}