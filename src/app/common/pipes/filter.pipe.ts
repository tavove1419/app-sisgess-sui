import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultPredial = []
    for (const predial of value) {
      if (predial.predio.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPredial.push(predial)
      }
    }
    return resultPredial
  }
}

@Pipe({
  name: 'filterUser'
})
export class FilterUserPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultUser = []
    for (const user of value) {
      if (user.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser.push(user)
      }
    }
    return resultUser
  }
}

@Pipe({
  name: 'filterInfoSui'
})
export class FilterInfoSuiPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultInfoSui = []
    for (const informationSui of value) {
      if (informationSui.predial.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultInfoSui.push(informationSui)
      }
    }
    return resultInfoSui
  }
}

@Pipe({
  name: 'filterNeighborhood'
})
export class FilterNeighborhoodPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultNeighborhood = []
    for (const informationNeighborhood of value) {
      if (informationNeighborhood.name_bar.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultNeighborhood.push(informationNeighborhood)
      }
    }
    return resultNeighborhood
  }
}
